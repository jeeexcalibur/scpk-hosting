import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaCubes, FaListUl, FaBalanceScale,
  FaPuzzlePiece, FaFolderOpen, FaChevronDown, FaChevronUp,
  FaChevronLeft, FaChevronRight, FaCog
} from 'react-icons/fa';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openKriteria, setOpenKriteria] = useState(true);

  const width = collapsed ? 'w-[80px]' : 'w-72';
  const iconSize = 'text-[20px]';
  const textClass = collapsed ? 'hidden' : 'inline';
  const sectionTitle = collapsed
    ? 'hidden'
    : 'uppercase text-gray-400 text-[13px] tracking-wide px-6 pb-1 mt-6';

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3 rounded-lg transition-all text-[17px] font-semibold ${
      isActive
        ? 'bg-blue-600 text-white shadow'
        : 'text-gray-700 hover:bg-blue-100'
    }`;

  return (
<aside className={`min-h-screen ${width} bg-[#f9fafb] border-r shadow-md transition-all duration-300 flex flex-col`}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        {!collapsed && (
          <h1 className="text-xl font-bold text-blue-700 tracking-wide">
            SAW KRA
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-blue-700 text-xl"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto pt-6 pb-4">
        <p className={sectionTitle}>Main</p>
        <NavLink to="/dashboard" className={linkClass}>
          <FaTachometerAlt className={iconSize} />
          <span className={textClass}>Dashboard</span>
        </NavLink>

        <p className={sectionTitle}>Data</p>
        <button
          onClick={() => setOpenKriteria(!openKriteria)}
          className="flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-blue-100 rounded-lg transition-all"
        >
          <span className="flex items-center gap-4">
            <FaCubes className={iconSize} />
            <span className={textClass}>Kriteria</span>
          </span>
          {!collapsed &&
            (openKriteria ? <FaChevronUp /> : <FaChevronDown />)}
        </button>

        {openKriteria && !collapsed && (
          <div className="ml-10 mt-1 space-y-2">
            <NavLink to="/kriteria" className={linkClass}>
              <FaListUl className={iconSize} />
              Kriteria
            </NavLink>
            <NavLink to="/crips" className={linkClass}>
              <FaPuzzlePiece className={iconSize} />
              Crips
            </NavLink>
            <NavLink to="/bobot" className={linkClass}>
              <FaBalanceScale className={iconSize} />
              Bobot
            </NavLink>
          </div>
        )}

        <p className={sectionTitle}>Evaluasi</p>
        <NavLink to="/alternatif" className={linkClass}>
          <FaFolderOpen className={iconSize} />
          <span className={textClass}>Alternatif</span>
        </NavLink>

        <NavLink to="/proses" className={linkClass}>
          <FaCog className={iconSize} />
          <span className={textClass}>Proses SAW</span>
        </NavLink>
      </nav>
    </aside>
  );
}
