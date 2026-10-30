import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";

import App from "../App";

/* The palette is the one surface that is only reachable through a keyboard
   shortcut or a click, so it gets its own suite: open, filter, act, close. */

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

const openPalette = () =>
  fireEvent.keyDown(document, { key: "k", metaKey: true });

describe("command palette", () => {
  it("opens from the keyboard shortcut and exposes a labelled dialog", async () => {
    render(<App />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    openPalette();

    const dialog = await screen.findByRole("dialog", { name: /command menu/i });
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByPlaceholderText(/jump to a section, project or action/i),
    ).toBeInTheDocument();
  });

  it("opens from the navbar trigger", async () => {
    render(<App />);
    /* The navbar trigger is hidden below the `sm` breakpoint, and jsdom
       evaluates the base `hidden` utility but not the media query that
       reveals it, so the query has to include hidden nodes. */
    fireEvent.click(screen.getByLabelText(/search this site/i));
    expect(
      await screen.findByRole("dialog", { name: /command menu/i }),
    ).toBeInTheDocument();
  });

  it("filters to the matching section", async () => {
    render(<App />);
    openPalette();

    const input = await screen.findByPlaceholderText(
      /jump to a section, project or action/i,
    );
    fireEvent.change(input, { target: { value: "case studies" } });

    await waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(
        options.some((option) => /case studies/i.test(option.textContent)),
      ).toBe(true);
    });

    const options = screen.getAllByRole("option");
    expect(
      options.some((option) => /nile valley emr/i.test(option.textContent)),
    ).toBe(false);
  });

  it("copies the email address without closing the palette", async () => {
    render(<App />);
    openPalette();

    const copy = await screen.findByRole("option", {
      name: /copy email address/i,
    });
    fireEvent.click(copy);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "lottanna47@gmail.com",
      );
    });
    expect(await screen.findByText(/email copied/i)).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: /command menu/i })).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<App />);
    openPalette();
    await screen.findByRole("dialog", { name: /command menu/i });

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
