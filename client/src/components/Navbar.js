import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate()
    


    function logOut(){
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark gradient-custom">
                {/* Container wrapper */}
                <div className="container-fluid">
                    {/* Navbar brand */}
                    {/* <Link className="navbar-brand" to="/" >Input Perusahaan</Link> */}
                    {/* Toggle button */}
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars text-light" />
                    </button>
                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Left links */}
                        <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
                            <li className="nav-item text-center mx-2 mx-lg-1">
                                <Link to="/" className="nav-link active" aria-current="page" >
                                    <div>
                                        <i className="fas fa-home fa-lg mb-1" />
                                    </div>
                                    Input Perusahaan
                                </Link>
                            </li>

                            <li className="nav-item text-center mx-2 mx-lg-1">
                                <Link to="/inputTransaksi" className="nav-link active" aria-current="page" >
                                    <div>
                                        <i className="fas fa-home fa-lg mb-1" />
                                    </div>
                                    Input Transaksi
                                </Link>
                            </li>
                          
                          

                        </ul>
                        {/* Left links */}
                        {/* Right links */}
                        <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
                        <li className="nav-item text-center mx-2 mx-lg-1">
                                <Link to="/downloadTransactions"className="nav-link active" aria-current="page">
                                    <div>
                                        <i className="far fa-envelope fa-lg mb-1" />
                                        <span className="badge rounded-pill badge-notification bg-dark"></span>
                                    </div>
                                    Download Semua Transaksi
                                </Link>
                            </li>
                            <li className="nav-item text-center mx-2 mx-lg-1">
                                <button className="d-flex btn btn-danger" onClick={logOut} >Log Out
                                    </button>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}