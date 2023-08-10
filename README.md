# snap-scroll-react

snap-scroll-react is a versatile React package that enables smooth snap scrolling behavior within your web applications. With this package, you can create scrollable sections that snap into place, enhancing the user experience and allowing users to navigate through your content effortlessly.

## Features

- **Smooth Snap Scrolling**: Enhance your website's scrolling experience by enabling smooth snap scrolling behavior. Sections snap into view, making navigation intuitive and engaging.

- **React Integration**: Designed for seamless integration with React applications. Easily create scrollable sections with just a few lines of code.

- **Customizable and Flexible**: Customize scroll behavior and appearance according to your project's requirements. The package's components can be easily tailored to fit your design.
- **Changing Hash on Scroll**: The package automatically updates the hash in the URL as you scroll through different sections, allowing users to bookmark or share specific sections using the URL.

## Installation

To install the package, simply run:

```bash
npm install snap-scroll-react
```

### Usage

The snap-scroll-react package provides two main components: SnapScroll and SnapItem.

## SnapScroll
Wrap your content with the SnapScroll component to enable snap scrolling

# Props

- `cooldown` (number): Specifies the cooldown between scrolls in milliseconds.

- `isSnapScrollEnabled` (boolean): Determines if the scroll behavior is snap scrolling (true) or normal scrolling (false). Snap scrolling provides a smoother experience by snapping to sections.

- `scrollPosition` (string): Defines where the section should be placed after scrolling. Options include:

  - `"nearest"`: The section is snapped to the nearest edge of the viewport (default).
  - `"center"`: The section is centered within the viewport.
  - `"start"`: The section starts at the top of the viewport.
  - `"end"`: The section ends at the bottom of the viewport.

- `userCanScroll` (boolean): Specifies whether the user can scroll the website. This applies to both snap scrolling and normal scrolling.


# SnapItem
Use SnapItem components to define individual sections within the SnapScroll container. If you use an HTML DOM element as a child of SnapItem, it will automatically receive the class snap-item-active when it's currently scrolled. If the child is a React component, it will receive the prop isActive, and you can access props.isActive within the element. Additionally, the prop props.className will be set to snap-item-active.

## Code examples

```bash
import React from "react";
import { SnapScroll, SnapItem } from "snap-scroll-react";

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

## SnapItem

Use SnapItem components to define individual sections within the SnapScroll container. Usage is similar for both TypeScript and JavaScript.

For further customization and advanced usage, refer to the documentation and package features sections.

## Contributing

Contributions are welcome! If you find a bug or have an enhancement in mind, please submit an issue or a pull request on the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

This version of the README now includes usage instructions and examples for both TypeScript and JavaScript users.
