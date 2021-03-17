import CustomPagination from "../components/CustomPagination";
import MeterialPagination from "../components/MeterialPagination";
import CustomCircularProgress from "../CustomCircularProgress";
import CustomSlider from "../CustomSlider";
import ImageLoadedTrick from "../ImageLoadedTrick";
import ImageTransitionZoom from "../ImageTransitionZoom";
import MediumImageZoom from "../MediumImageZoom";
import MouseMoveZoom from "../MouseMoveZoom";
import Slider from "../Slider";
import TableView from "../TableView";

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
    name: "image loaded trick",
    path: "/image-loaded-trick",
    component: ImageLoadedTrick,
  },
  {
    name: "mouse move zoom image",
    path: "/mouse-move-zoom-image",
    component: MouseMoveZoom,
  },
  {
    name: "image transition zoom (incompleted)",
    path: "/image-transition-zoom",
    component: ImageTransitionZoom,
  },
  {
    name: "medium image zoom",
    path: "/medium-image-zoom",
    component: MediumImageZoom,
  },
  {
    name: "table structure (incompleted)",
    path: "/table-view",
    component: TableView,
  },
];

export const SystemPaths = [];
