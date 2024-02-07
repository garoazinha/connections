defmodule AppWeb.PageController do
  use AppWeb, :controller

  def index(conn, _params) do
    render(conn, :index, layout: false, page_title: "Conecta ae")
  end
end
