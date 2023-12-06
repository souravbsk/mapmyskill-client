import React from 'react'
import SubscriptionCard from './SubscriptionCard/SubscriptionCard'
import SubscriptionSection from './SubscriptionSection/SubscriptionSection'

function Subscription() {
  return (
    <div className=''>
<div className='text-6xl font-semibold text-center py-8'>
    <span className='text-6xl text-blue-800 font-bold'>choose</span> your plan!
</div>
<div>
<SubscriptionSection></SubscriptionSection>

</div>

    </div>
  )
}

export default Subscription