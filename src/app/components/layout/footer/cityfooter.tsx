import React, { useEffect, useState } from 'react';
import styles from './CityFooter.module.css'; 

const CityFooter: React.FC = () => {
    const [data, setData] = useState<{ title: string; available: { text: string; link: string }[] } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/cms/footer-cities`);
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div className={styles.cityfooter}>
            {data && (
                <>
                    <h2 className={styles.footerTitle}>{data.title}</h2> 
                    <div className={styles.footerLinks}> 
                        {data.available.map((item:any, idx:any) => (
                            <div key={idx} className={styles.footerItem}> 
                                <a href={item.link} className={styles.footerLink}>{item.text}</a> 
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CityFooter;
