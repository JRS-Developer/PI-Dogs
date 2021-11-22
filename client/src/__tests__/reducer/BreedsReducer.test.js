import reducer from "../../reducer/BreedsReducer";
// Actions Creators
import {
  setBreeds,
  filterBreeds,
  setIsFiltering,
} from "../../actions/BreedsActions";

const breeds = [
  {
    id: "1d0a776d-2e66-4961-836b-111c1dd4c1f9",
    name: "Custom dog",
    image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    weight: "6 - 19",
    height: "9 - 29.5",
  },
  {
    id: 1,
    name: "Affenpinscher",
    image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    weight: "6 - 13",
    height: "9 - 11.5",
  },
  {
    id: 232,
    name: "Smooth Fox Terrier",
    image: "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
    temperament: "Fearless, Affectionate, Alert, Playful, Intelligent, Active",
    weight: "up - 18",
    height: "15.5",
  },
  {
    id: 172,
    name: "Norfolk Terrier",
    image: "https://cdn2.thedogapi.com/images/B1ADQg94X.jpg",
    temperament:
      "Self-confidence, Fearless, Spirited, Companionable, Happy, Lovable",
    weight: "11 - 12",
    height: "9 - 10",
  },
  {
    id: 196,
    name: "Poodle (Miniature)",
    image: "https://cdn2.thedogapi.com/images/Hkxk4ecVX.jpg",
    weight: "15 - 17",
    height: "11 - 15",
  },
  {
    id: 208,
    name: "Redbone Coonhound",
    image: "https://cdn2.thedogapi.com/images/HJMzEl5N7.jpg",
    temperament:
      "Affectionate, Energetic, Independent, Companionable, Familial, Unflappable",
    weight: "45 - 80",
    height: "21 - 27",
  },
];

const previousState = {
  breeds: [],
  filteredBreeds: [],
  isFiltering: {
    type: "",
    temperament: "",
    sort: {
      value: "", // This is not used, it is only to identify the option to be selected
      param: "",
      order: "",
    },
  },
};

describe("BreedsReducer redux", () => {
  describe("Setting breeds", () => {
    it("should return the initial state", () => {
      expect(reducer(undefined, {})).toEqual(previousState);
    });
    it("Should save the breeds properly", () => {
      expect(reducer(previousState, setBreeds(breeds))).toEqual({
        ...previousState,
        breeds,
        filteredBreeds: breeds,
      });
    });
  });
  describe("Setting state of filtering breeds", () => {
    it("should setFiltering by type properly", () => {
      const newValue = "real";

      expect(reducer(previousState, setIsFiltering("type", newValue))).toEqual({
        ...previousState,
        isFiltering: {
          ...previousState.isFiltering,
          type: newValue,
        },
      });
    });
    it("should setFiltering by temperament properly", () => {
      const newValue = "Happy";

      expect(
        reducer(previousState, setIsFiltering("temperament", newValue))
      ).toEqual({
        ...previousState,
        isFiltering: {
          ...previousState.isFiltering,
          temperament: newValue,
        },
      });
    });
    it("should setFiltering by sort properly", () => {
      const newValue = { value: "name", param: "name", order: "ASC" };

      expect(
        reducer(previousState, setIsFiltering("sort", newValue)).isFiltering
      ).toEqual({
        ...previousState.isFiltering,
        sort: newValue,
      });
    });
  });
  describe("filtering breeds function", () => {
    it("should filter the breeds by type real properly", () => {
      const expectedResult = [
        {
          id: 1,
          name: "Affenpinscher",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 13",
          height: "9 - 11.5",
        },
        {
          id: 232,
          name: "Smooth Fox Terrier",
          image: "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
          temperament:
            "Fearless, Affectionate, Alert, Playful, Intelligent, Active",
          weight: "up - 18",
          height: "15.5",
        },
        {
          id: 172,
          name: "Norfolk Terrier",
          image: "https://cdn2.thedogapi.com/images/B1ADQg94X.jpg",
          temperament:
            "Self-confidence, Fearless, Spirited, Companionable, Happy, Lovable",
          weight: "11 - 12",
          height: "9 - 10",
        },
        {
          id: 196,
          name: "Poodle (Miniature)",
          image: "https://cdn2.thedogapi.com/images/Hkxk4ecVX.jpg",
          weight: "15 - 17",
          height: "11 - 15",
        },
        {
          id: 208,
          name: "Redbone Coonhound",
          image: "https://cdn2.thedogapi.com/images/HJMzEl5N7.jpg",
          temperament:
            "Affectionate, Energetic, Independent, Companionable, Familial, Unflappable",
          weight: "45 - 80",
          height: "21 - 27",
        },
      ];

      let newState = previousState;
      // SetBreeds
      newState = reducer(newState, setBreeds(breeds));
      // setFiltering by type as real
      newState = reducer(newState, setIsFiltering("type", "real"));

      expect(reducer(newState, filterBreeds()).filteredBreeds).toEqual(
        expectedResult
      );
    });
    it("should filter the breeds by type fake properly", () => {
      const expectedResult = [
        {
          id: "1d0a776d-2e66-4961-836b-111c1dd4c1f9",
          name: "Custom dog",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 19",
          height: "9 - 29.5",
        },
      ];

      let newState = previousState;
      // SetBreeds
      newState = reducer(newState, setBreeds(breeds));
      // setFiltering by type as real
      newState = reducer(newState, setIsFiltering("type", "fake"));

      expect(reducer(newState, filterBreeds()).filteredBreeds).toEqual(
        expectedResult
      );
    });
    it("should filter the breeds by temperament properly", () => {
      const expectedResult = [
        {
          id: "1d0a776d-2e66-4961-836b-111c1dd4c1f9",
          name: "Custom dog",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 19",
          height: "9 - 29.5",
        },
        {
          id: 1,
          name: "Affenpinscher",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 13",
          height: "9 - 11.5",
        },
        {
          id: 232,
          name: "Smooth Fox Terrier",
          image: "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
          temperament:
            "Fearless, Affectionate, Alert, Playful, Intelligent, Active",
          weight: "up - 18",
          height: "15.5",
        },
      ];

      let newState = previousState;
      // SetBreeds
      newState = reducer(newState, setBreeds(breeds));
      // setFiltering by type temperament
      newState = reducer(newState, setIsFiltering("temperament", "Playful"));

      expect(reducer(newState, filterBreeds()).filteredBreeds).toEqual(
        expectedResult
      );
    });
    it("should sort the breeds by name ASC properly", () => {
      const expectedResult = [
        {
          id: 1,
          name: "Affenpinscher",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 13",
          height: "9 - 11.5",
        },
        {
          id: "1d0a776d-2e66-4961-836b-111c1dd4c1f9",
          name: "Custom dog",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 19",
          height: "9 - 29.5",
        },
        {
          id: 172,
          name: "Norfolk Terrier",
          image: "https://cdn2.thedogapi.com/images/B1ADQg94X.jpg",
          temperament:
            "Self-confidence, Fearless, Spirited, Companionable, Happy, Lovable",
          weight: "11 - 12",
          height: "9 - 10",
        },
        {
          id: 196,
          name: "Poodle (Miniature)",
          image: "https://cdn2.thedogapi.com/images/Hkxk4ecVX.jpg",
          weight: "15 - 17",
          height: "11 - 15",
        },
        {
          id: 208,
          name: "Redbone Coonhound",
          image: "https://cdn2.thedogapi.com/images/HJMzEl5N7.jpg",
          temperament:
            "Affectionate, Energetic, Independent, Companionable, Familial, Unflappable",
          weight: "45 - 80",
          height: "21 - 27",
        },
        {
          id: 232,
          name: "Smooth Fox Terrier",
          image: "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
          temperament:
            "Fearless, Affectionate, Alert, Playful, Intelligent, Active",
          weight: "up - 18",
          height: "15.5",
        },
      ];
      let newState = previousState;
      // SetBreeds
      newState = reducer(newState, setBreeds(breeds));
      // setFiltering by type temperament
      newState = reducer(
        newState,
        setIsFiltering("sort", { value: "name", param: "name", order: "ASC" })
      );

      expect(reducer(newState, filterBreeds()).filteredBreeds).toEqual(
        expectedResult
      );
    });
    it("should sort the breeds by name DESC properly", () => {
      const expectedResult = [
        {
          id: 232,
          name: "Smooth Fox Terrier",
          image: "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
          temperament:
            "Fearless, Affectionate, Alert, Playful, Intelligent, Active",
          weight: "up - 18",
          height: "15.5",
        },
        {
          id: 208,
          name: "Redbone Coonhound",
          image: "https://cdn2.thedogapi.com/images/HJMzEl5N7.jpg",
          temperament:
            "Affectionate, Energetic, Independent, Companionable, Familial, Unflappable",
          weight: "45 - 80",
          height: "21 - 27",
        },
        {
          id: 196,
          name: "Poodle (Miniature)",
          image: "https://cdn2.thedogapi.com/images/Hkxk4ecVX.jpg",
          weight: "15 - 17",
          height: "11 - 15",
        },
        {
          id: 172,
          name: "Norfolk Terrier",
          image: "https://cdn2.thedogapi.com/images/B1ADQg94X.jpg",
          temperament:
            "Self-confidence, Fearless, Spirited, Companionable, Happy, Lovable",
          weight: "11 - 12",
          height: "9 - 10",
        },
        {
          id: "1d0a776d-2e66-4961-836b-111c1dd4c1f9",
          name: "Custom dog",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 19",
          height: "9 - 29.5",
        },
        {
          id: 1,
          name: "Affenpinscher",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 13",
          height: "9 - 11.5",
        },
      ];

      let newState = previousState;
      // SetBreeds
      newState = reducer(newState, setBreeds(breeds));
      // setFiltering by type temperament
      newState = reducer(
        newState,
        setIsFiltering("sort", { value: "name", param: "name", order: "DESC" })
      );

      expect(reducer(newState, filterBreeds()).filteredBreeds).toEqual(
        expectedResult
      );
    });
    it("should sort the breeds by weight ASC properly", () => {
      const expectedResult = [
        {
          id: 172,
          name: "Norfolk Terrier",
          image: "https://cdn2.thedogapi.com/images/B1ADQg94X.jpg",
          temperament:
            "Self-confidence, Fearless, Spirited, Companionable, Happy, Lovable",
          weight: "11 - 12",
          height: "9 - 10",
        },
        {
          id: 1,
          name: "Affenpinscher",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 13",
          height: "9 - 11.5",
        },
        {
          id: 196,
          name: "Poodle (Miniature)",
          image: "https://cdn2.thedogapi.com/images/Hkxk4ecVX.jpg",
          weight: "15 - 17",
          height: "11 - 15",
        },
        {
          id: 232,
          name: "Smooth Fox Terrier",
          image: "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
          temperament:
            "Fearless, Affectionate, Alert, Playful, Intelligent, Active",
          weight: "up - 18",
          height: "15.5",
        },
        {
          id: "1d0a776d-2e66-4961-836b-111c1dd4c1f9",
          name: "Custom dog",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 19",
          height: "9 - 29.5",
        },
        {
          id: 208,
          name: "Redbone Coonhound",
          image: "https://cdn2.thedogapi.com/images/HJMzEl5N7.jpg",
          temperament:
            "Affectionate, Energetic, Independent, Companionable, Familial, Unflappable",
          weight: "45 - 80",
          height: "21 - 27",
        },
      ];

      let newState = previousState;
      // SetBreeds
      newState = reducer(newState, setBreeds(breeds));
      // setFiltering by type temperament
      newState = reducer(
        newState,
        setIsFiltering("sort", {
          value: "weight",
          param: "weight",
          order: "ASC",
        })
      );

      expect(reducer(newState, filterBreeds()).filteredBreeds).toEqual(
        expectedResult
      );
    });
    it("should sort the breeds by weight DESC properly", () => {
      const expectedResult = [
        {
          id: 208,
          name: "Redbone Coonhound",
          image: "https://cdn2.thedogapi.com/images/HJMzEl5N7.jpg",
          temperament:
            "Affectionate, Energetic, Independent, Companionable, Familial, Unflappable",
          weight: "45 - 80",
          height: "21 - 27",
        },
        {
          id: "1d0a776d-2e66-4961-836b-111c1dd4c1f9",
          name: "Custom dog",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 19",
          height: "9 - 29.5",
        },
        {
          id: 232,
          name: "Smooth Fox Terrier",
          image: "https://cdn2.thedogapi.com/images/Syszjx9Em.jpg",
          temperament:
            "Fearless, Affectionate, Alert, Playful, Intelligent, Active",
          weight: "up - 18",
          height: "15.5",
        },
        {
          id: 196,
          name: "Poodle (Miniature)",
          image: "https://cdn2.thedogapi.com/images/Hkxk4ecVX.jpg",
          weight: "15 - 17",
          height: "11 - 15",
        },
        {
          id: 1,
          name: "Affenpinscher",
          image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          temperament:
            "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          weight: "6 - 13",
          height: "9 - 11.5",
        },
        {
          id: 172,
          name: "Norfolk Terrier",
          image: "https://cdn2.thedogapi.com/images/B1ADQg94X.jpg",
          temperament:
            "Self-confidence, Fearless, Spirited, Companionable, Happy, Lovable",
          weight: "11 - 12",
          height: "9 - 10",
        },
      ];

      let newState = previousState;
      // SetBreeds
      newState = reducer(newState, setBreeds(breeds));
      // setFiltering by type temperament
      newState = reducer(
        newState,
        setIsFiltering("sort", {
          value: "weight",
          param: "weight",
          order: "DESC",
        })
      );

      expect(reducer(newState, filterBreeds()).filteredBreeds).toEqual(
        expectedResult
      );
    });
  });
});
