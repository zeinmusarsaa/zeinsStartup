import React from 'react';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  return (
    <div>
      <main>
        <h1>Favorites</h1>
        <ul>
          <li><a href="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2Farchive%2F28af3f00835c1564f1806eddff49a90a0f22dc79">Hummus</a></li>
          <li><a href="https://www.marthastewart.com/thmb/PrIgwQqtcz_jrwAIaeM7mQyjOww=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mh_1124_falafel_horiz-d2e942495517497786b814afd66b5f7a.jpgitok2QyTj9XI">Falafel</a></li>
          <li><a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjE-QX1qDHfBI3IaLcPlJRjrMKJnvKHePU1f4a4XYh8g&usqp=CAU&ec=48665701">Tabbouleh</a></li>
          <li><a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJNjdGaWTHwtxjRQo00ibM7wnsCepJp28bm15X1Upkw&usqp=CAU&ec=48665701">Shawarma</a></li>
        </ul>
      </main>
      <footer>
        <a href="https://github.com/zeinmusarsaa/zeinsStartup">GitHub</a>
        <button className="button"><Link to="/profile">Return to Profile</Link></button>
      </footer>
    </div>
  );
};

export default Favorites;
