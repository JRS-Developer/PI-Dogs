import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import CreateBreed from "../pages/CreateBreed";
import store from "../store/index";

describe("<CreateBreed />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CreateBreed />
      </Provider>
    );
  });
  describe("Structure", () => {
    it("should render a form", () => {
      expect(screen.getByRole("form")).toBeInTheDocument();
    });
    it("should contain an input for the name", () => {
      expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    });
    it("should contain two inputs, one for the min and one for the max height", () => {
      expect(screen.getByPlaceholderText(/min height/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/max height/i)).toBeInTheDocument();
    });
    it("should contain two inputs, one for the min and one for the max weight", () => {
      expect(screen.getByPlaceholderText(/min weight/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/max weight/i)).toBeInTheDocument();
    });
    it("should contain two inputs, one for the min and one for the max years", () => {
      expect(screen.getByPlaceholderText(/min years/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/max years/i)).toBeInTheDocument();
    });
    it("should contain a select for the temperaments", () => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
    it("should contain a button to submit the form", () => {
      expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    });
    it("should contain an input to upload a image", () => {
      expect(screen.getByPlaceholderText(/image/i)).toBeInTheDocument();
    });
  });

  describe("Form Validations", () => {
    it("should show a message when the name input is empty", async () => {
      const input = screen.getByPlaceholderText(/name/i);
      fireEvent.change(input, { target: { value: "hola" } });
      fireEvent.change(input, { target: { value: "" } });

      expect(
        await screen.findByText(/this value is required/i)
      ).toBeInTheDocument();
    });
    it("should show a message when the min weight input is empty", async () => {
      const input = screen.getByPlaceholderText(/min weight/i);
      fireEvent.change(input, { target: { value: 1 } });
      fireEvent.change(input, { target: { value: "" } });

      expect(
        await screen.findByText(/this value is required/i)
      ).toBeInTheDocument();
    });
    it("should show a message when the max weight input is empty", async () => {
      const input = screen.getByPlaceholderText(/max weight/i);
      fireEvent.change(input, { target: { value: 1 } });
      fireEvent.change(input, { target: { value: "" } });

      expect(
        await screen.findByText(/this value is required/i)
      ).toBeInTheDocument();
    });
    it("should show a message when the min height input is empty", async () => {
      const input = screen.getByPlaceholderText(/min height/i);
      fireEvent.change(input, { target: { value: 1 } });
      fireEvent.change(input, { target: { value: "" } });

      expect(
        await screen.findByText(/this value is required/i)
      ).toBeInTheDocument();
    });
    it("should show a message when the max height input is empty", async () => {
      const input = screen.getByPlaceholderText(/max height/i);
      fireEvent.change(input, { target: { value: 1 } });
      fireEvent.change(input, { target: { value: "" } });

      expect(
        await screen.findByText(/this value is required/i)
      ).toBeInTheDocument();
    });
    it("should show a message when the min height is higher that the max height", async () => {
      const minInput = screen.getByPlaceholderText(/min height/i);
      const maxInput = screen.getByPlaceholderText(/max height/i);

      fireEvent.change(minInput, { target: { value: 10 } });
      fireEvent.change(maxInput, { target: { value: 1 } });

      expect(
        await screen.findByText(/the min height cant be higher+/i)
      ).toBeInTheDocument();
    });
    it("should show a message when the min weight is higher that the max weight", async () => {
      const minInput = screen.getByPlaceholderText(/min weight/i);
      const maxInput = screen.getByPlaceholderText(/max weight/i);

      fireEvent.change(minInput, { target: { value: 10 } });
      fireEvent.change(maxInput, { target: { value: 1 } });

      expect(
        await screen.findByText(/the min weight cant be higher+/i)
      ).toBeInTheDocument();
    });
    it("should show a message when the min years is higher that the max years", async () => {
      const minInput = screen.getByPlaceholderText(/min years/i);
      const maxInput = screen.getByPlaceholderText(/max years/i);

      fireEvent.change(minInput, { target: { value: 10 } });
      fireEvent.change(maxInput, { target: { value: 1 } });

      expect(
        await screen.findByText(/the min years cant be higher+/i)
      ).toBeInTheDocument();
    });
    it("should not show a error message when a no required input is empty, like the min years and max years", () => {
      const min = screen.getByPlaceholderText(/min years/i);
      const max = screen.getByPlaceholderText(/max years/i);

      fireEvent.change(min, { target: { value: 1 } });
      fireEvent.change(min, { target: { value: "" } });
      fireEvent.change(max, { target: { value: 1 } });
      fireEvent.change(max, { target: { value: "" } });

      expect(
        screen.queryByText(/this value is required/i)
      ).toBeNull();
    });
    it("should show group of error messages when the form is submitted and the required inputs are empty", async () => {
      const form = screen.getByRole("form");

      fireEvent.submit(form);

      expect(
        await screen.findAllByText(/this value is required/i)
      ).toHaveLength(5); //There are five required inputs, name, min height, max height, min weight, and max weight
    });
    it("the submit button should have the disabled attribute when there are errors in the form", async () => {
      const input = screen.getByPlaceholderText(/name/i);

      fireEvent.change(input, { target: { value: "n" } });
      fireEvent.change(input, { target: { value: "" } });

      expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
    });
  });
});
