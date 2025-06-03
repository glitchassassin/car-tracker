import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Car Tracker - SMOC Event</h1>

      <p>
        Welcome to the Car Tracker application for the Single Moms Oil Change (SMOC) outreach event.
        This application helps volunteers track cars through the oil change process.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="floor" element={<Floor />} />
          <Route path="handoff" element={<Handoff />} />
          <Route path="display" element={<Display />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/floor">Floor</Link>
          </li>
          <li>
            <Link to="/handoff">Handoff</Link>
          </li>
          <li>
            <Link to="/display">Display</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to Car Tracker</h2>
      <p>Select your role from the navigation above to get started:</p>
      <ul>
        <li><strong>Registration:</strong> Check in arriving cars</li>
        <li><strong>Floor:</strong> Manage cars during oil change process</li>
        <li><strong>Handoff:</strong> Handle completed cars for pickup</li>
        <li><strong>Display:</strong> Public display for car owners</li>
      </ul>
    </div>
  );
}

function Registration() {
  return (
    <div>
      <h2>Registration Station</h2>
      <p>Check in arriving cars and verify vehicle details.</p>
    </div>
  );
}

function Floor() {
  return (
    <div>
      <h2>Floor Management</h2>
      <p>Manage cars during the oil change process.</p>
    </div>
  );
}

function Handoff() {
  return (
    <div>
      <h2>Handoff Station</h2>
      <p>Handle completed cars ready for owner pickup.</p>
    </div>
  );
}

function Display() {
  return (
    <div>
      <h2>Public Display</h2>
      <p>Car status display for owners waiting for their vehicles.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
