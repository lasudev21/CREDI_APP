import { BrowserRouter as Router, Route, Routes,  Navigate } from 'react-router-dom'
import { useDashboardStore } from './store/store'
import Login from './containers/Login'
import { Layout } from './containers/Layout/Layout'

export default function App() {
  const isAuthenticated = useDashboardStore((state) => state.isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route
          path="/*"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  )
}