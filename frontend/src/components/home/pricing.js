import React from 'react';
import { List, Card, Button } from 'antd';

const data = [
    {
      title: 'Basic',
      content: [
          {
              price: "$100 donation",
              mentoring: "Obtain direct support from our community ",
              support: "All categories",
              jobs: "no IT jobs offers",
              email: "no important email notifications"
          }
      ]
    },
    {
        title: 'Freelancer',
        content: [
            {
                price: "$200 donation",
                mentoring: "Obtain support from teaches ",
                support: "All categories",
                jobs: "yes, IT jobs offers",
                email: "yes, important email notifications"
            }
        ]
      },
      {
        title: 'Junior',
        content: [
            {
                price: "$400 donation",
                mentoring: "Obtain personalized study paths",
                support: "All categories",
                jobs: "yes, IT jobs offers",
                email: "yes, important email notifications"
            }
        ]
      }
  ];

const AppPricing = () => {
    return (
        <div className="block pricingBlock bgGray">
             <div className="container-fluid">
             <div className="titleHolder">
                 <h2>Monthly Donation Plans</h2>
                 <p>Join the community and recieve monthly donations from grateful users!</p>
             </div>
             <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <Card >
                <p style={{fontSize:'30px'}}>{item.content[0].price}</p>
                <p>{item.content[0].mentoring}</p>
                <p>{item.content[0].support}</p>
                <Button type="primary" size="large"><i class="fab fa-telegram-plane"></i>&nbsp; Get started</Button>
                </Card>
            </List.Item>
            )}
        />
             </div>
            
        </div>
    );
}

export default AppPricing;
