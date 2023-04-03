import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import Item from "./Item";
import InfiniteScroll from "react-infinite-scroll-component";

function Table({ loadMoreUsers, userList }) {
  const { t } = useTranslation();
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      loadMoreUsers(20);
    }
    mounted.current = true;
  }, [mounted]);

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <InfiniteScroll
            dataLength={userList.length}
            next={loadMoreUsers}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-400">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 bg-slate-200 "
                  >
                    {t("number")}
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 bg-slate-200 "
                  >
                    {t("identification")}
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-5 pr-4 text-left text-sm font-semibold text-gray-900  bg-slate-200"
                  >
                    {t("name")}
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 bg-slate-200"
                  >
                    {t("address")}
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 bg-slate-200 "
                  >
                    {t("phone")}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {userList.map((user, index) => (
                  <Item key={index} index={index} user={user} />
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Table;
