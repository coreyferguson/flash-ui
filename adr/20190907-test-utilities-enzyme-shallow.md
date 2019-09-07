
# Test utilities to return MemoryRouter when calling shallow

## Context

We need to test components with React Router components such as `Link`. The [docs](https://reacttraining.com/react-router/web/guides/testing) recommend using a `MemoryRouter`. This is likely to be a frequent operation.

## Decision

Create a new function exported by `TestUtilities.js` called `shallow` that automatically composes the `MemoryRouter`.

## Consequences

Performing operations on the component in question now requires additional processing to function correctly. The `shallow` function now returns a reference to the `MemoryRouter` instead of the Component being tested. This can be a problem when trying to perform operations on the Component, for example `wrapper.setState` would set the state of `MemoryRouter` instad.

This can be overcome by obtaining a reference to the child using `find` and `dive` operations from Enzyme:

```
import { expect, shallow } from '.../support/TestUtilities';

// ...

it('error within ErrorBoundary', () => {
  const wrapper = shallow(
    <ErrorBoundary logger={logger}>
      <Content />
    </ErrorBoundary>
  );
  const component = wrapper.find('ErrorBoundary').dive();
  component.setState({ error: new Error('oops') });
  expect(component.html()).to.contain('Unknown error');
  expect(component.html()).to.contain('oops');
});
```
