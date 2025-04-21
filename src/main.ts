export { type IconNode, lucideSnippet };

type SVGProps = Record<string, string | number>;
type IconNode = [tag: string, attrs: SVGProps][];
type Getters<T> = {
  [K in keyof T]: () => T[K];
};
type CreateRawSnippet = <Params extends unknown[]>(
  fn: (...params: Getters<Params>) => {
    render: () => string;
    setup?: (element: Element) => void | (() => void);
  },
) => Snippet<Params>;

interface Snippet<Parameters extends unknown[] = []> {
  (
    this: void,
    ...args: number extends Parameters["length"] ? never : Parameters
  ): {
    "{@render ...} must be called with a Snippet":
      "import type { Snippet } from 'svelte'";
  };
}

// to avoid waste of resources, squash attrs in advance
const DEFAULT_ATTRS = {
  xmlns:
    'http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round',
  class: "",
};

function lucideSnippet(
  createRawSnippet: CreateRawSnippet,
): Snippet<[IconNode, string]> {
  return createRawSnippet((name: () => IconNode, cls: () => string) => ({
    render: () => svg(name(), cls()),
  }));
}
function svg(name: IconNode, cls: string = ""): string {
  DEFAULT_ATTRS.class = cls;
  return chunk(["svg", DEFAULT_ATTRS, name]);
}
function chunk([type, props, children]: [string, SVGProps, IconNode?]): string {
  const child = children?.length
    ? children.map((child) => chunk(child)).join("")
    : "";
  const main = tag(type, props, children);
  return child ? main.replace("<>", child) : main;
}
function tag(type: string, props: SVGProps = {}, children?: IconNode): string {
  const attrs = Object.entries(props)
    .filter(([_, v]) => v)
    .map(([a, v]) => `${a}="${v}"`)
    .join(" ");
  const front = attrs ? `<${type} ${attrs}` : `<${type}`;
  const back = children?.length ? `><></${type}>` : " />";
  return `${front}${back}`;
}
