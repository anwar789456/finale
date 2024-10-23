'use client'
import {React , useState} from 'react'
import Background from '../../../components/LivingComponents/Background/background'
import SideNavbar from '../../../components/Sidemenu/index'
import Header from '../../../components/Header';
export default function Shop({ params }) {
  const [sortData, setSortData] = useState(null);
  const [FilteredData, setFilteredData] = useState('all');
  const [priceRange, setPriceRange] = useState([0,10000]);

  const handleFilterchange = (FilteredData) => {
    setFilteredData(FilteredData);
  }
  
  const handleSortchange = (sortData) => {
    setSortData(sortData);
  }
  
  const handlePriceRangechange = (priceRange) => {
    setPriceRange(priceRange);
  }
  

  return (
    <>
      <Header sticky={true} />
      <SideNavbar onfilterChange={handleFilterchange} onSortChange={handleSortchange} onPriceRangeChange={handlePriceRangechange} />
      <Background subcategory={params} filterData={FilteredData} sortingOption={sortData} priceRange={priceRange} />
    </>
  )
}