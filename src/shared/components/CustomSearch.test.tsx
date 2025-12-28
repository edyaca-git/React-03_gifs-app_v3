import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomSearch } from "./CustomSearch";

describe("CustomSearch", () => {
  test("should render CustomSearch correctly", () => {
    const { container } = render(<CustomSearch onQuery={() => {}} />);

    // metodo para tomar una foto del componente
    expect(container).toMatchSnapshot();

    // metodo para verificar que existan los elementos
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    // muestra en pantalla para debuggear
    //screen.debug();

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call only onece with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "test1" } });
    fireEvent.change(input, { target: { value: "test2" } });
    fireEvent.change(input, { target: { value: "test3" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call onQuery when button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test"); 

  });

  test("should the input has the correct placeholder", () => {
 
    const value = "Buscar gif";
    render(<CustomSearch onQuery={()=> {}} customPlaceHolder={value} />);

    screen.debug();

    expect(screen.getByPlaceholderText(value)).toBeDefined();
  });

});
