export default function TabsComponent(props: any) {
  return (
    <div>
      <div className="sm:hidden shadow rounded-lg px-3 py-2.5 float-left mr-6 ring-1 ring-black ring-opacity-5">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={
            props.tabs.find((tab: any) => props.currentTab === tab.value).name
          }
          onChange={(e) => props.onChange(e.target.value)}
        >
          {props.tabs.map((tab: any) => (
            <option value={tab.value} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="flex divide-x divide-gray-200 rounded-lg shadow ring-1 ring-black ring-opacity-5"
          aria-label="Tabs"
        >
          {props.tabs.map((tab: any, tabIdx: number) => (
            <a
              onClick={() => props.onChange(tab.value)}
              key={tab.name}
              className={`${
                props.currentTab === tab.value
                  ? 'bg-[#3f9944] text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer'
              }
                ${tabIdx === 0 ? 'rounded-l-lg' : ''}
                ${tabIdx === props.tabs.length - 1 ? 'rounded-r-lg' : ''}
                group relative min-w-0 overflow-hidden py-2 px-4 text-sm font-medium text-center focus:z-10`}
            >
              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
