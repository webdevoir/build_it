function signUpWorkerButton()
{
  $( '#worker_signup_button' ).click( function( event ){
    event.preventDefault();
    var request = $.ajax({
      method: "GET",
      data: {type: "worker"},
      url: "/api/v1/signup/worker"
    });
    request.done(function( data ){
      $( '#select-type' )
        .fadeOut( 1000 );
      $( '#container' )
        .append( data );
      $( '#worker-signup-form' )
        .slideUp( 0 );
      $( '#worker-signup-form' )
        .slideDown( 700 );

      $( "form#sign_up_worker" ).bind( "ajax:success", function( e, data, status, xhr ) {
        if ( data.success ){
          init_worker_dashboard();
        }
        else{
          for ( var i = 0; i < data.errors.length; i++ ){
            if ( submitted == 1 ){
              $( "#worker_" + data.fields[ i ] + "" )
                .data( "kendoTooltip" ).destroy();
              $( "#worker_" + data.fields[ i ] + "" )
                .css( "background-color", "#EDE2D3" );
            }

            tooltip = $( "#worker_" + data.fields[ i ] + "" )
              .kendoTooltip( {
                position: "right",
                showOn: "mouseenter",
                autoHide: true,
                content: data.errors[ i ],
            });
            tooltip.css( "background-color", "#D0806F" );
            tooltip.show();
          }
          submitted = 1;
        }
      });
    });
  });
}
function signUpContractorButton()
{
  $( '#contractor_signup_button' ).click( function( event ){
    event.preventDefault();
    var request = $.ajax({
      method: "GET",
      data: {type: "contractor"},
      url: "/api/v1/signup/worker"
    });
    request.done(function( data ){
      $( '#select-type' )
        .fadeOut( 1000 );
      $( '#container' )
        .append( data );
      $( '#worker-signup-form' )
        .slideUp( 0 );
      $( '#worker-signup-form' )
        .slideDown( 700 );

      $( "form#sign_up_contractor" ).bind( "ajax:success", function( e, data, status, xhr ) {
        if ( data.success ){
          init_worker_dashboard();
        }
        else{
          for ( var i = 0; i < data.errors.length; i++ ){
            if ( submitted == 1 ){
              $( "#worker_" + data.fields[ i ] + "" )
                .data( "kendoTooltip" ).destroy();
              $( "#worker_" + data.fields[ i ] + "" )
                .css( "background-color", "#EDE2D3" );
            }

            tooltip = $( "#worker_" + data.fields[ i ] + "" )
              .kendoTooltip( {
                position: "right",
                showOn: "mouseenter",
                autoHide: true,
                content: data.errors[ i ],
            });
            tooltip.css( "background-color", "#D0806F" );
            tooltip.show();
          }
          submitted = 1;
        }
      });
    });
  });
}