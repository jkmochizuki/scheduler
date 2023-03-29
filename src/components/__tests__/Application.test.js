import React from "react";
import axios from "axios";
import Application from "components/Application";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByDisplayValue,
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
    /*
     * renders, loads data and gets the first appointment
     */
    const { container } = render(<Application />);

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

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    /*
     * checks that it reduces the spots remaining for the first day by 1
     */
    const day = getAllByTestId(container, "day").find((d) =>
      queryByText(d, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    /*
     * renders, loads data and gets the appointment that contains "Archie Cohen"
     */
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find((a) =>
      queryByText(a, "Archie Cohen")
    );

    /*
     * cancels an interview
     */
    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => queryByAltText(appointment, "Add"));

    /*
     * checks that it increases the spots remaining for the first day by 1
     */
    const day = getAllByTestId(container, "day").find((d) =>
      queryByText(d, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    /*
     * renders, loads data and gets the appointment that contains "Archie Cohen"
     */
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    /*
     * edits an interview
     */
    const appointment = getAllByTestId(container, "appointment").find((a) =>
      queryByText(a, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

    const input = getByDisplayValue(appointment, "Archie Cohen");
    fireEvent.change(input, {
      target: { value: "Jules Smith" },
    });

    expect(getByDisplayValue(appointment, "Jules Smith")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Jules Smith"));

    /*
     * checks that the spots remaining remains the same
     */
    const day = getAllByTestId(container, "day").find((d) =>
      queryByText(d, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    /*
     * sets up the mock function before rendering the component
     */
    axios.put.mockRejectedValueOnce();

    /*
     * loads data and gets the first appointment
     */
    const { container } = render(<Application />);

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
     * checks that an error message is displayed when failing to save the appointment
     */
    await waitForElement(() => getByText(appointment, "Could not save."));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    /*
     * sets up the mock function before rendering the component
     */
    axios.delete.mockRejectedValueOnce();

    /*
     * renders, loads data and gets the appointment that contains "Archie Cohen"
     */
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    /*
     * cancels an interview
     */
    const appointment = getAllByTestId(container, "appointment").find((a) =>
      queryByText(a, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    /*
     * checks that an error message is displayed when failing to cancel the appointment
     */
    await waitForElement(() => getByText(appointment, "Could not delete."));
  });

});
