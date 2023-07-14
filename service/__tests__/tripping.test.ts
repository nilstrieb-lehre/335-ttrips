import davos_frauenkirch_geneve_rive from "./davos_frauenkirch-genève_rive.json";
import { tripToStopStations } from "../tripping";

it("should convert the connection to a station list", () => {
  const [stations] = tripToStopStations(davos_frauenkirch_geneve_rive);

  expect(stations).toHaveLength(9);
  expect(stations).toMatchSnapshot();
});
