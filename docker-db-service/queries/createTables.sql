CREATE TABLE dbo.Account(
  accountId nvarchar(36) not null,
  name nvarchar(255) not null,
  taxRate decimal(10, 2) not null default 0.00,
  currency nvarchar(3) not null,
  constraint pk_account_id PRIMARY KEY (accountId)
);
CREATE TABLE dbo.Product(
  productId nvarchar(36) not null,
  name nvarchar(255) not null,
  price decimal(10, 2) not null default 0.00,
  constraint pk_product_id PRIMARY KEY (productId)
);
CREATE TABLE dbo.[Order](
  orderId nvarchar(36) not null,
  accountId nvarchar(36) not null,
  date datetime2 not null,
  constraint pk_order_id PRIMARY KEY (orderId),
  constraint fk_account_id FOREIGN KEY (accountId) REFERENCES dbo.Account(accountId)
);
CREATE TABLE dbo.OrderProduct(
  orderId nvarchar(36) not null,
  productId nvarchar(36) not null,
  quantity int not null,
  constraint pk_order_product_id PRIMARY KEY (orderId, productId),
  constraint fk_order_id FOREIGN KEY (orderId) REFERENCES dbo.[Order](orderId),
  constraint fk_product_id FOREIGN KEY (productId) REFERENCES dbo.Product(productId)
);