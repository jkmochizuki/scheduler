import React from "react";
import Application from "components/Application";
import {
  render,
  cleanup,
  debug,
  fireEvent,
  waitForElement,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByDisplayValue,
  getByRole,
  getAllByDisplayValue,
  getByLabelText,
} from "@testing-library/react";

afterEach(cleanup);

describe("Application tests", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    /*
     * loads data and gets the first appointment
     */
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    /*
     * books an interview
     */
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    /*
     * checks that it reduces the spots remaining for the first day by 1
     */
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(d =>
      queryByText(d, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(a =>
      queryByText(a, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(d =>
    queryByText(d, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    });

    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      // 1. Render the Application.
      const { container } = render(<Application />);
  
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 3. Click the "Edit" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(a =>
        queryByText(a, "Archie Cohen")
      );
      fireEvent.click(queryByAltText(appointment, "Edit"));
      
      // 4. Check that the interview is shown.
      expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

      const input = getByDisplayValue(appointment, "Archie Cohen");
      fireEvent.change(input, {
        target: { value: "Jules Smith" },
      });

      // 4. Check that the interview is shown.
      expect(getByDisplayValue(appointment, "Jules Smith")).toBeInTheDocument();
     

      // 5. Click the "Save" button on the confirmation.
      fireEvent.click(getByText(appointment, "Save"));
  
      // 6. Check that the element with the text "Saving" is displayed.
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
      // 7. Wait until the element with the new value is displayed.
      await waitForElement(() => getByText(appointment, "Jules Smith"));
  
      // 8. Check that the DayListItem with the text "Monday" also has the same "1 spots remaining".
      const day = getAllByTestId(container, "day").find(d =>
      queryByText(d, "Monday")
      );
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
      });

});
