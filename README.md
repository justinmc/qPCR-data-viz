# qPCR-data-viz

A frontend app that reads output data from a [qPCR machine](http://www.bio-rad.com/en-us/applications-technologies/introduction-qpcr-instrumentation?ID=LUSO5YMNI) and visualizes the data for each well.

## Architecture
I scaffolded out this app just using a default create-react-app setup and just used vanilla React.  It would probably need a more complex data store as it grows, especially if it needs to handle asynchronous data fetching.

## Performance
I store the qPCR data in a simple 1D array and make derivations of that data as needed.  This seems to work fine on this scale and with these features (the only slow down I see might be a slight delay when checking the checkbox), but it would need to be rethought to handle significantly more data.  Memoization of some derived values might help as well in order to ensure that React only rerenders when absolutely necessary.
