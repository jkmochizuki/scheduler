import React from "react";
import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application tests", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    /* returns a promise that resolves when the callback returns a truthy value and rejects after a time out when it cannot find the specified text */
      return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })
  });

});


/*
We will use containers to find specific DOM nodes.
We will chain promises to handle asynchronous testing.
We will override mock implementations for specific tests.
We will use setup and teardown functions provided by Jest to perform common tasks.
*/

