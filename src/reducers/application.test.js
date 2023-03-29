const { cleanup } = require("@testing-library/react");
const { reducer } = require("./application");

afterEach(cleanup);

describe("Application reducer tests", () => {
  it("throws an error with an unsupported type", async () => {
    /* toThrowError matcher to ensure the error message matches what our reducer throws */
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});
