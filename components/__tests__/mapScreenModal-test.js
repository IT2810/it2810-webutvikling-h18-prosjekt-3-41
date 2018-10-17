import React from "react";
import "react-native"
import MapScreenModal from "../mapScreenModal";
import renderer from "react-test-renderer";

it('renders correctly', () => {
    const tree = renderer.create(<MapScreenModal brother={{snus:["G3,G4"]}}/>).toJSON();
    expect(tree).toMatchSnapshot()
});