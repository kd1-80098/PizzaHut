create table customers(
    id bigint primary key auto_increment,
    name varchar(50) not null,
    email varchar(50) not null unique,
    password varchar(255) not null,
    mobile_n0 varchar(10) not null unique,
    address varchar(255) not null,
    pincode varchar(6) not null,
    image varchar(255) not null default 'https://cdn-icons-png.flaticon.com/128/9703/9703076.png',
    status varchar(10) default 'active'
    );


create table vendors(
     id bigint primary key auto_increment,
    name varchar(50) not null,
    email varchar(50) not null unique,
    password varchar(255) not null,
    mobile_n0 varchar(10) not null unique,
    address varchar(255) not null,
    pincode varchar(6) not null,
    rating int not null default 4,
    status varchar(10) default 'pending'
);

create table admin(
    id bigint primary key auto_increment,
    email varchar(50) not null unique,
    password varchar(255) not null
);

create table pizza(
    id bigint primary key auto_increment,
    name varchar(50) not null,
    vendor_id bigint not null,
    description text not null,
    category boolean not null,
    type varchar(20) not null,
    rating int not null default 4,
    price double not null,
    image varchar(255) not null,
    constraint fk_vendor_id_pizza foreign key(vendor_id) references vendors(id) on update cascade on delete cascade,
    constraint uc_vendor_id_pizza unique(name,vendor_id)  
);

CREATE table cart
(
  id bigint PRIMARY KEY auto_increment,
  customer_id bigint Not Null,
  pizza_id bigint Not Null,
  unit_price float Not Null,
  quantity int default 1,
  discount float Not Null Default 0.00,
  total_amount float Not Null Default (unit_price * quantity * (1-discount)),
  CONSTRAINT fk_customer_id_cart FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE ,
  CONSTRAINT fk_pizza_id_cart FOREIGN KEY (pizza_id) REFERENCES pizza(id) ON UPDATE CASCADE ON DELETE CASCADE
);


create table orders(
    id bigint primary key auto_increment,
    customer_id bigint not null,
    order_total float not null,
    otime datetime not null default (now()),
    dtime datetime,
    status varchar(10) default 'active',
    constraint fk_customerid_orders foreign key (customer_id) references customers(id) on update cascade on delete cascade
);

CREATE table orders_items
(
    id bigint PRIMARY KEY auto_increment,
    order_id bigint Not Null,
    pizza_id bigint Not Null,
    unit_price float Not Null,
    quantity int default 1,
    discount float Not Null Default 0.00,
    total_amount float Not Null Default (unit_price * quantity * (1-discount)),
    CONSTRAINT fk_order_id_orderitems FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_pizza_id_orderitems FOREIGN KEY (pizza_id) REFERENCES pizza(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table favourites
(
    id bigint primary key auto_increment,
    customer_id bigint not null,
    pizza_id bigint not null,
    CONSTRAINT fk_pizza_id_favourites FOREIGN KEY (pizza_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_customer_id_favourites FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table payments(
    id bigint primary key auto_increment,
    order_id bigint not null,
    payment_method varchar(10) not null,
    transaction_id varchar(50) not null unique,
    constraint fk_order_id_payment foreign key(order_id) references orders(id) on update cascade on delete cascade
);

create table feedback(
    id bigint primary key auto_increment,
    customer_id bigint not null,
    vendor_id bigint not null,
    suggestion text, 
    constraint fk_customer_id_feedback foreign key(customer_id) references customers(id) on update cascade on delete cascade,
    constraint fk_vendor_id_feedback foreign key(vendor_id) references vendors(id) on update cascade on delete cascade
);