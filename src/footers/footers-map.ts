import NothingFooter from "./NothingFooter";
import PrincipalFooter from "./principal";

// Dynamic routes can also be added to the staticFootersMap as for example "/products/[slug]": PrincipalFooter. This will match the route /products/whatever
const staticFootersMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  "/": PrincipalFooter,
  "/products": PrincipalFooter,
  "/_error": NothingFooter,
};

interface dynamicFooterRule {
  pattern: RegExp;
  footer: React.FC<{ children: JSX.Element }>;
}

// This is a broader approach to dynamic routes, where you can define a pattern to match the pathname
const dynamicFootersRules: dynamicFooterRule[] = [
  { pattern: /^\/products\/(.+)$/, footer: PrincipalFooter }, // Matches /products/whatever and nested routes
];

export { staticFootersMap, dynamicFootersRules };
