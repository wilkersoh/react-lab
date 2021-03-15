import CustomPagination from "../components/CustomPagination";
import MeterialPagination from "../components/MeterialPagination";
import CustomCircularProgress from "../CustomCircularProgress";
import CustomSlider from "../CustomSlider";
import MouseMoveZoom from "../MouseMoveZoom";
import Slider from "../Slider";
import TableView from "../TableView";
import ZoomImage from "../ZoomImage";

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
  {
    name: "Zoom Image transition",
    path: "/zoom-image",
    component: ZoomImage,
  },
  {
    name: "table structure",
    path: "/table-view",
    component: TableView,
  },
  {
    name: "mouse move zoom image",
    path: "/mouse-move-zoom-image",
    component: MouseMoveZoom,
  },
];

export const SystemPaths = [];
