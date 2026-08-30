import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn } from "./use-hydrated-DjofOuhO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-PaN46YB7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("field flex h-11 w-full rounded-sm bg-wit px-3 text-base text-ink tabular-nums transition-[box-shadow] duration-150 placeholder:text-warm placeholder:tabular-nums focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-sm font-semibold text-ink", className),
	...props
}));
Label.displayName = "Label";
//#endregion
export { Label as n, Input as t };
