import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CreateRequestForm from "./create-request-form";

describe("CreateRequestForm", () => {
  it("renders all required form fields", () => {
    render(<CreateRequestForm onCreate={vi.fn()} />);

    expect(screen.getByLabelText(/Request Title/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Request" }),
    ).toBeInTheDocument();
  });

  it("shows a validation error when required fields are empty", async () => {

    const onCreate = vi.fn().mockResolvedValue(undefined);

    render(<CreateRequestForm onCreate={onCreate} />);

    fireEvent.submit(screen.getByRole("button", { name: "Submit Request" }).closest("form")!);

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Please complete all required fields.");

    expect(onCreate).not.toHaveBeenCalled();
  });

  it("trims input values before submitting", async () => {
    const user = userEvent.setup();

    const onCreate = vi.fn().mockResolvedValue(undefined);

    render(<CreateRequestForm onCreate={onCreate} />);

    await user.type(
      screen.getByLabelText(/Request Title/),
      "  Internet issue  ",
    );

    await user.type(
      screen.getByLabelText(/Description/),
      "  Connection is unavailable.  ",
    );

    await user.click(screen.getByRole("button", { name: "Submit Request" }));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith({
        title: "Internet issue",
        description: "Connection is unavailable.",
        category: "IT",
        priority: "MEDIUM",
      });
    });
  });

  it("shows an error when the title exceeds 150 characters", async () => {
    const user = userEvent.setup();

    const onCreate = vi.fn().mockResolvedValue(undefined);

    render(<CreateRequestForm onCreate={onCreate} />);

    fireEvent.change(screen.getByLabelText(/Request Title/), {
      target: { value: "A".repeat(151) },
    });

    await user.type(
      screen.getByLabelText(/Description/),
      "Test description",
    );

    fireEvent.submit(screen.getByRole("button", { name: "Submit Request" }).closest("form")!);

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("Title must not exceed 150 characters.");

    expect(onCreate).not.toHaveBeenCalled();
  });

  it("submits the selected category and priority", async () => {
    const user = userEvent.setup();

    const onCreate = vi.fn().mockResolvedValue(undefined);

    render(<CreateRequestForm onCreate={onCreate} />);

    await user.type(
      screen.getByLabelText(/Request Title/),
      "Office maintenance",
    );

    await user.type(
      screen.getByLabelText(/Description/),
      "Repair the office equipment.",
    );

    await user.selectOptions(
      screen.getByLabelText(/Category/),
      "Facilities",
    );

    await user.selectOptions(
      screen.getByLabelText(/Priority/),
      "HIGH",
    );

    await user.click(screen.getByRole("button", { name: "Submit Request" }));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith({
        title: "Office maintenance",
        description: "Repair the office equipment.",
        category: "Facilities",
        priority: "HIGH",
      });
    });
  });

  it("shows a success message and resets the form after submission", async () => {
    const user = userEvent.setup();

    const onCreate = vi.fn().mockResolvedValue(undefined);

    render(<CreateRequestForm onCreate={onCreate} />);

    await user.type(
      screen.getByLabelText(/Request Title/),
      "Network issue",
    );

    await user.type(
      screen.getByLabelText(/Description/),
      "Network is unavailable.",
    );

    await user.click(screen.getByRole("button", { name: "Submit Request" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Service request created successfully.",
    );

    expect(screen.getByLabelText(/Request Title/)).toHaveValue("");
    expect(screen.getByLabelText(/Description/)).toHaveValue("");
    expect(screen.getByLabelText(/Category/)).toHaveValue("IT");
    expect(screen.getByLabelText(/Priority/)).toHaveValue("MEDIUM");
  });

  it("displays the submission error when creation fails", async () => {
    const user = userEvent.setup();

    const onCreate = vi.fn().mockRejectedValue(
      new Error("Unable to create service request."),
    );

    render(<CreateRequestForm onCreate={onCreate} />);

    await user.type(
      screen.getByLabelText(/Request Title/),
      "Printer issue",
    );

    await user.type(
      screen.getByLabelText(/Description/),
      "Printer is not working.",
    );

    await user.click(screen.getByRole("button", { name: "Submit Request" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to create service request.",
    );

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("disables the form while submission is in progress", async () => {
    const user = userEvent.setup();


    let resolveSubmission!: () => void;

    const onCreate = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmission = resolve;
        }),
    );

    render(<CreateRequestForm onCreate={onCreate} />);

    await user.type(
      screen.getByLabelText(/Request Title/),
      "Server issue",
    );

    await user.type(
      screen.getByLabelText(/Description/),
      "Server is unavailable.",
    );

    await user.click(screen.getByRole("button", { name: "Submit Request" }));

    expect(screen.getByRole("button", { name: "Submitting..." })).toBeDisabled();
    expect(screen.getByLabelText(/Request Title/)).toBeDisabled();
    expect(screen.getByLabelText(/Description/)).toBeDisabled();

    resolveSubmission();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Submit Request" }),
      ).toBeEnabled();
    });
  });
});
