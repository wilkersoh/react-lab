import CustomPagination from "../components/CustomPagination";
import MeterialPagination from "../components/MeterialPagination";
import CustomCircularProgress from "../CustomCircularProgress";
import CustomSlider from "../CustomSlider";
import Slider from "../Slider";

export const PATHS = [
  {
    name: "meterial pagination",
    path: "/meterial-pagination",
    component: MeterialPagination,
  },
  {
    name: "custom pagination",
    path: "/custom-pagination",
    component: CustomPagination,
  },
  {
    name: "slider",
    path: "/slider",
    component: Slider,
  },
  {
    name: "custom slider",
    path: "/custom-slider",
    component: CustomSlider,
  },
  {
    name: "custom circular progress",
    path: "/custom-circular-progress",
    component: CustomCircularProgress,
  },
];
