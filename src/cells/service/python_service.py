import importlib
from inspect import signature, Signature
from typing import Callable, Any


GenericFn = Callable[[Any], Any]


class PythonService:
    def get_fn(self, module_name: str) -> GenericFn:
        imported_module = importlib.import_module(module_name, package=None)
        fns = dir(imported_module)
        public_fns = [fn for fn in fns if fn[0] != "_" and fn[-1] != "_"]

        if len(public_fns) > 1:
            raise ValueError("Files must only export one function")

        fn_name = public_fns[0]
        fn = getattr(imported_module, fn_name, None)

        if fn is None:
            raise ValueError(
                f"Unable to find function {fn_name} in module {module_name}"
            )

        return fn  # type: ignore[no-any-return]

    def get_params(self, fn: GenericFn) -> Signature:
        return signature(fn)

    def run_method(self, fn: GenericFn, args: list[Any]) -> Any:
        params = self.get_params(fn)

        expected_num = len(params.parameters.values())
        received_num = len(args)

        assert (
            expected_num == received_num
        ), f"Function expects {expected_num} parameters, but {received_num} were supplied."

        return fn(*args)
