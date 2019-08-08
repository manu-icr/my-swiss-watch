import React from "react";
import { mount, shallow } from "enzyme";
import ProductConfig from "./ProductConfig";
import Slider from "rc-slider"; // Slider UI lib

describe("the Color component", () => {

  const colorOptions = [
    {
      description: "Iditarod",
      primary: "#fbfbfb", // white
      secondary: "#f67944", // orange
      tertiary: "#2677bb", // blue
      quaternary: "#c7943e" // copper
    }
  ];
  const zoomValue = 1;
  const handleColor = jest.fn();

  let wrapper = null;
  let radios = null;

  beforeEach(() => {
    /* wrapper = mount(
       <ProductConfig colorOptions={colorOptions.slice(0, 4)} zoom={zoomValue} >
         {function ({ colorChoice, zoom }) {
           return (
             <div colors={colorChoice} zoom={zoom}>
               <ProductConfig.Zoom />
               <ProductConfig.Color />
             </div>
           );
         }}
       </ProductConfig>
     );*/
    wrapper = mount(
      <ProductConfig>{() =>
        <div>
          <ProductConfig.Zoom />
          <ProductConfig.Color />
        </div>
      }
      </ProductConfig>
    );
  });

  afterEach(() => {
    wrapper = null;
  });

  it("renders a <Color /> without crashing", () => {

    expect(wrapper.find(Slider).props().value).toBe(zoomValue);

  });

  it("renders radio buttons", () => {
    radios = wrapper.find("input[type='radio']");
    expect(radios.length).toBeTruthy();
  });

  it("selects a color", () => {
    radios.last().simulate("click");
    expect(wrapper.state.colorChoice).toBe(radios.last().value);
  });

  
  const spy = jest.spyOn(ProductConfig.prototype, "handleColor");
  it("selects a color", () => {
    radios.last().simulate("change");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});


describe("the Zoom component", () => {
  const handleZoom = jest.fn();
  let zoomConsumer = null;

  it("renders without crashing", () => {
    zoomConsumer = shallow(<ProductConfig.Zoom />);
  });

  it("renders a slider component that takes its change-handler from the consumer", () => {
    const ZoomWithContext = zoomConsumer.props().children;
    const wrapper = mount(<ZoomWithContext handleZoom={handleZoom} />);
    expect(wrapper.find(Slider).prop("onChange")).toBe(handleZoom);
  });
});