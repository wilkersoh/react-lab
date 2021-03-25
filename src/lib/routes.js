import BinarySearch from "../BinarySearch";
import Chart from "../Chart";
import CustomPagination from "../components/CustomPagination";
import MeterialPagination from "../components/MeterialPagination";
import CustomCircularProgress from "../CustomCircularProgress";
import CustomSlider from "../CustomSlider";
import ImageLoadedTrick from "../ImageLoadedTrick";
import ImageTransitionZoom from "../ImageTransitionZoom";
import ListenOnScreen from "../ListenOnScreen";
import MediumImageZoom from "../MediumImageZoom";
import MouseMoveZoom from "../MouseMoveZoom";
import NestedRouteInSamePage from "../NestedRouteInSamePage";
import NestedRouteOtherPage from "../NestedRouteOtherPage";
import PreviewImage from "../PreviewImage";
import ProtectedRoute from "../ProtectedRoute";
import ReducerBenefit from "../ReducerBenefit";
import ReducerContext from "../ReducerContext";
import Slider from "../Slider";
import TableView from "../TableView";
import TransitionNumberSelected from "../TransitionNumberSelected";

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
    name: "table structure",
    path: "/table-view",
    component: TableView,
  },
  {
    name: "transition effect of number",
    path: "/transition-effect-number",
    component: TransitionNumberSelected,
  },
  {
    name: "nested route (same page)",
    path: "/nested-routing-same-page",
    component: NestedRouteInSamePage,
  },
  {
    name: "nested route (other page)",
    path: "/nested-routed-page",
    component: NestedRouteOtherPage,
  },
  {
    name: "protected route",
    path: "/protected-route",
    component: ProtectedRoute,
  },
  {
    name: "useReducer with useContext",
    path: "/usereducer-usecontext",
    component: ReducerContext,
  },
  {
    name: "useReducer more handy than useState",
    path: "/usereducer-benefit",
    component: ReducerBenefit,
  },
  {
    name: "hook listen view area",
    path: "/use-on-screen",
    component: ListenOnScreen,
  },
  {
    name: "binary search",
    path: "/binary-search",
    component: BinarySearch,
  },
  {
    name: "chart rechart",
    path: "/rechart-package",
    component: Chart,
  },
  {
    name: "preview image",
    path: "/preview-image",
    component: PreviewImage,
  },
];
