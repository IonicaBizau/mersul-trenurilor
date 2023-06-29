## Documentation

You can see below the API reference of this module.

### `train(id)`
Information about a given train ID.

#### Params

- **Number** `id`: The train ID (e.g. `367`, not IR367)

#### Return
- **Promise** A promise resolving with the scraped train information:
     - `train_category` (String): The train category.
     - `train_number` (String): The train number.
     - `route` (Array): An array of objects containing:
       - `arrive_time` (String): The arrive time.
       - `arrive_time_comment` (String): Arrive time comment (such as delays)
       - `location` (String): The stop information.
       - `distance` (String): The number of the km in the route.
       - `stop_comment (String): The stop comment, such as how long the stop time is.
       - `leave_time` (String): The leave time.
       - `leave_time_comment` (String): The leave time comment.

