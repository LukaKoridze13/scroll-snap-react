# scroll-snap-react

scroll-snap-react is a versatile React package that enables smooth snap scrolling behavior within your web applications. With this package, you can create scrollable sections that snap into place, enhancing the user experience and allowing users to navigate through your content effortlessly.

## Features

- **Smooth Snap Scrolling**: Enhance your website's scrolling experience by enabling smooth snap scrolling behavior. Sections snap into view, making navigation intuitive and engaging.

- **React Integration**: Designed for seamless integration with React applications. Easily create scrollable sections with just a few lines of code.

- **Customizable and Flexible**: Customize scroll behavior and appearance according to your project's requirements. The package's components can be easily tailored to fit your design.
- **Changing Hash on Scroll**: The package automatically updates the hash in the URL as you scroll through different sections, allowing users to bookmark or share specific sections using the URL.

## Installation

To install the package, simply run:

```bash
npm install scroll-snap-react
```

## Usage

The scroll-snap-react package provides two main components: SnapScroll and SnapItem.

SnapScroll
Wrap your content with the SnapScroll component to enable snap scrolling:

## TypeScript

```bash
import React from "react";
import { SnapScroll, SnapItem } from "scroll-snap-react";

function App() {
  return (
    <SnapScroll>
      <SnapItem id="section1">Section 1</SnapItem>
      <SnapItem id="section2">Section 2</SnapItem>
      {/* Add more SnapItems as needed */}
    </SnapScroll>
  );
}
```

## Javascript

```bash
// Import your package (Make sure to adjust the path)
const ScrollSnapReact = require("scroll-snap-react");

// Create an instance of SnapScroll
const snapScroll = ScrollSnapReact.SnapScroll.create({
  content: [
    ScrollSnapReact.SnapItem.create({ id: "section1", children: "Section 1" }),
    ScrollSnapReact.SnapItem.create({ id: "section2", children: "Section 2" }),
    // Add more SnapItems as needed
  ]
});

// Append the snapScroll container to the DOM
document.body.appendChild(snapScroll.container);
```

## SnapItem

Use SnapItem components to define individual sections within the SnapScroll container. Usage is similar for both TypeScript and JavaScript.

For further customization and advanced usage, refer to the documentation and package features sections.

## Contributing

Contributions are welcome! If you find a bug or have an enhancement in mind, please submit an issue or a pull request on the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

This version of the README now includes usage instructions and examples for both TypeScript and JavaScript users.
