import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, User, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminUsers() {
  const { user, getUsers } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.email !== 'admin') {
      navigate('/');
      return;
    }
    setUsers(getUsers());
  }, [user, navigate, getUsers]);

  if (user?.email !== 'admin') return null;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <ShieldAlert size={28} className="admin-icon" />
        <h2>Registered Users</h2>
        <span className="admin-badge">{users.length} total</span>
      </div>

      {users.length === 0 ? (
        <div className="admin-empty">
          <Users size={48} />
          <p>No registered users yet.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th><User size={14} /> Name</th>
                <th><Mail size={14} /> Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.email}>
                  <td className="admin-num">{i + 1}</td>
                  <td>{u.name}</td>
                  <td className="admin-email">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
