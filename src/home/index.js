import MainComponent from "./main";
import RightComponent from "./watchlist";
import New from "./new"

function Home() {
    return(
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <MainComponent/>
                </div>
                <div className="col-4">
                    <RightComponent/>
                    <New/>
                </div>
           </div>
       </div>
    );
}
export default Home;