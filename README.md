# deno-lucide

[![JSR](https://jsr.io/badges/@scirexs/lucide)](https://jsr.io/@scirexs/lucide)

This package only provides an adapter function of Lucide icons for Svelte on
Deno. The adapter function returns Snippet of an icon specified by argument.

## Requirements

- A Svelte project set up on Deno

## Usage

1. Add following packages. (Use "lucide" package instead of "@lucide/svelte")

```sh
deno add npm:lucide jsr:@scirexs/lucide
```

2. Prepare a function to make Snippet using `createRawSnippet`.

```ts
import { createRawSnippet, type Snippet } from "svelte";
import { type IconNode, lucideSnippet } from "@scirexs/lucide";

// `as Snippet<[IconNode, string]>` is necessary because TypeScript cannot infer
// the correct type when the symbol is nested inside the Snippet generic
const lucide = lucideSnippet(createRawSnippet) as Snippet<[IconNode, string]>;
```

3. Render Lucide icon with class.

```ts
import { TentTree } from "lucide";
```

```
{@render lucide(TentTree, "class value for svg")}
```
