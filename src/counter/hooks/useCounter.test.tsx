import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";


describe ('useCounter', () => {

    test('should inicialize with default value of 10', () =>{
        const { result } = renderHook( ()=> useCounter(10) );
        
        expect(result.current.counter).toBe(10);

    });

    test('should inicialize with value 20', () =>{
        const inicialValue =20;
        const { result } = renderHook( ()=> useCounter(inicialValue) );
        
        expect(result.current.counter).toBe(inicialValue);

    });

    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook( ()=> useCounter() );

        act(() =>{
            result.current.handleAdd()
        });        

        expect(result.current.counter).toBe(11);
    });

    test('should decrement counter when handleSubtract is called', () => {
        const { result } = renderHook( ()=> useCounter() );

        act(() =>{
            result.current.handleSubtract()
        });        

        expect(result.current.counter).toBe(9);
    });

    test('should reset to inicial value when handleReset is called', () => {
        const { result } = renderHook( ()=> useCounter() );

        act(() =>{
            result.current.handleSubtract()
            result.current.handleSubtract()
            result.current.handleSubtract()
            result.current.handleSubtract()
            result.current.handleSubtract()
        });        

        expect(result.current.counter).toBe(5);
        act(() =>{
            result.current.handleReset()
        });        

        expect(result.current.counter).toBe(10);
    });
 
});