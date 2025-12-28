import {  renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act } from "react";
import * as gifActions from "../actions/get.gifts-by-query.action";

describe("useGifs", () => {
  test("should return values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(typeof result.current.handleSearch).toBeDefined();
    expect(typeof result.current.handleTermCliked).toBeDefined();
  });

  test("should return a list of gifs with handleSearch", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("One Punch");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermCliked("Dragon Ball");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from cache using handleTermCliked", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermCliked("Dragon Ball");
    });

    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(gifActions, "getGiftsByQuery").mockRejectedValue(
      new Error("This is my custom error")
    );

    await act(async () => {
      await result.current.handleTermCliked("Dragon Ball");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 8 previous terms using handleTermCliked", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGiftsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("goku1");
    });
    await act(async () => {
      await result.current.handleSearch("goku2");
    });
    await act(async () => {
      await result.current.handleSearch("goku3");
    });
    await act(async () => {
      await result.current.handleSearch("goku4");
    });
    await act(async () => {
      await result.current.handleSearch("goku5");
    });
    await act(async () => {
      await result.current.handleSearch("goku6");
    });
    await act(async () => {
      await result.current.handleSearch("goku7");
    });
    await act(async () => {
      await result.current.handleSearch("goku8");
    });
    await act(async () => {
      await result.current.handleSearch("goku9");
    });

    console.log(result.current.previousTerms);

    expect(result.current.previousTerms.length).toBe(8);

    expect(result.current.previousTerms).toStrictEqual([
      "goku9",
      "goku8",
      "goku7",
      "goku6",
      "goku5",
      "goku4",
      "goku3",
      "goku2",
    ]);

  });

});
