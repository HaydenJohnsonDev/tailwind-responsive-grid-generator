const pageContent = {
  title: "Tailwind Responsive Grid Generator",
  description:
    "This tool aids developers in crafting custom and responsive Tailwind grid layouts. It draws inspiration from [userLink]'s highly useful [pageLink] tool. Similar to its counterpart, users can specify the number of columns, rows, gutter size, and DIV width (span). Additionally, they have the option to leverage Tailwind's breakpoints for creating a responsive layout.",
  userLink: {
    label: "Kristjan Retter",
    href: "https://twitter.com/KristjanRetter",
  },
  pageLink: {
    label: "Tailwind Grid Generator",
    href: "https://www.tailwindgen.com/",
  },
  howToTitle: "How to use",
  howToSteps: [
    "Switch between breakpoints 'none', 'sm', 'mg', 'lg', 'xl', and '2xl'.",
    "Customize the number of columns, rows, and gaps to fit your needs.",
    "Click the square with + sign to add a new element to the grid.",
    "Resize the DIV using the handle in the bottom right corner.",
    "Drag and drop the DIV to reposition it as desired.",
    "Finally, copy the generated HTML code and paste it into your project.",
  ],
} as const;

export default pageContent;
