import NothingLayout from "./nothing";
import PrincipalLayout from "./principal";

const layoutsMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  "/": PrincipalLayout,
  "/products": PrincipalLayout,
  "/_error": NothingLayout,
};

export default layoutsMap;
