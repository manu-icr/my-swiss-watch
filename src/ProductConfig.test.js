import React from "react";
import { mount } from "enzyme";
import ProductConfig from "./ProductConfig";

describe("the Color component", () => {
  let wrapper = null;
  let radios = null;

  it("renders a <Color /> without crashing", () => {
    wrapper = mount(
      <ProductConfig>
        {(colorOptions, { colorChoice }) => (
          <ProductConfig.Color
            colorOptions={colorOptions}
            colorChoice={colorChoice}
          />
        )}
      </ProductConfig>
    );
  });

  it("renders radio buttons", () => {
    radios = wrapper.find("input[type='radio']");
    expect(radios.length).toBeTruthy();
  });

  it("selects a color", () => {
    radios.last().simulate("click");
    expect(wrapper.state.colorChoice).toBe(radios.last().value);
  });
});
