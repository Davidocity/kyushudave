export default function remarkAutoPhoto() {
  return function (tree) {
    const alreadyImported = tree.children.some(
      (node) =>
        node.type === "mdxjsEsm" &&
        node.value?.includes("Photo.astro")
    );

    if (alreadyImported) return;

    tree.children.unshift({
      type: "mdxjsEsm",
      value: 'import Photo from "@/layouts/components/Photo.astro";',
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ImportDeclaration",
              specifiers: [
                {
                  type: "ImportDefaultSpecifier",
                  local: {
                    type: "Identifier",
                    name: "Photo",
                  },
                },
              ],
              source: {
                type: "Literal",
                value: "@/layouts/components/Photo.astro",
                raw: '"@/layouts/components/Photo.astro"',
              },
            },
          ],
        },
      },
    });
  };
}