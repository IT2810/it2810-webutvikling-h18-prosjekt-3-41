import "react-native";
import React from "react";
import Test from "../screens/Test";
import renderer from "react-test-renderer";

test("Test snap", () => {
    const snap = renderer.create(
        <Test/>
    ).toJSON();
    expect(snap).toMatchSnapshot();
});