import React from "react";
import { Button, AlertVariant } from "@patternfly/react-core";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { AlertPanel } from "./AlertPanel";
import { useAlerts } from "./Alerts";

jest.useFakeTimers();

const WithButton = () => {
  const [add, alerts, hide] = useAlerts();
  return (
    <>
      <AlertPanel alerts={alerts} onCloseAlert={hide} />
      <Button onClick={() => add("Hello", AlertVariant.default)}>Add</Button>
    </>
  );
};

it("renders global alerts", () => {
  const empty = mount(<AlertPanel alerts={[]} onCloseAlert={() => {}} />);
  expect(empty).toMatchSnapshot();

  const tree = mount(<WithButton />);
  const button = tree.find("button");
  expect(button).not.toBeNull();

  act(() => {
    button!.simulate("click");
  });
  expect(tree).toMatchSnapshot();

  act(() => {
    jest.runAllTimers();
  });
  expect(tree).toMatchSnapshot();
});
