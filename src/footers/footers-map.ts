import NothingFooter from "./NothingFooter";
import PrincipalFooter from "./principal";

const footersMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  "/": PrincipalFooter,
  "/products": PrincipalFooter,
  "/_error": NothingFooter,
};

export default footersMap;
