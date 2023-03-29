import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application tests", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    /* renders the Application */
    const { container } = render(<Application />);

    /* waits until the text "Archie Cohen" is displayed */
    await waitForElement(() => getByText(container, "Archie Cohen"));

    /* gets first appointment */
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    /* clicks the "Add" button on the first empty appointment */
    fireEvent.click(getByAltText(appointment, "Add"));

    /* enters the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name" */
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    /* clicks the first interviewer in the list */
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    /* clicks the "Save" button on that same appointment */
    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));
  });
});

/* TODO
Check that the element with the text "Saving" is displayed.
Wait until the element with the text "Lydia Miller-Jones" is displayed.
Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
*/
