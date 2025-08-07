import { Outlet } from "react-router-dom"

function AdminLayout() {
  return <div className="flex min h-screen w-full ">
        {/* admin sidebar */}
        <div>Admin sidebar</div>
        <div className="flex flex-1 flex-col">
            {/* admin header */}
            <div>Admn header</div>
            <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
                <Outlet/>
            </main>
        </div>

  </div>
}

export default AdminLayout